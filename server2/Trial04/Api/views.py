import cv2
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
from pymongo import MongoClient 
import pandas as pandas
import tensorflow as tensorflow
from keras.models import load_model
from bson.objectid import ObjectId
import os
import json
from keras.models import load_model
from joblib import load
from IPython.display import Image
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import transformers
import h5py
import tensorflow as tf

model = load("./teacherModel/TeacherEvalRf.joblib")
model1 = load("./teacherModel/StudEval.joblib")


max_length = 512  # Maximum length of input sentence to the model.
batch_size = 32
epochs = 2

# Labels in our dataset.
labels = ["contradiction", "entailment", "neutral"]

class BertSemanticDataGenerator(tf.keras.utils.Sequence):

    def _init_(
        self,
        sentence_pairs,
        labels,
        batch_size=batch_size,
        shuffle=True,
        include_targets=True,
    ):
        self.sentence_pairs = sentence_pairs
        self.labels = labels
        self.shuffle = shuffle
        self.batch_size = batch_size
        self.include_targets = include_targets
        # Load our BERT Tokenizer to encode the text.
        # We will use base-base-uncased pretrained model.
        self.tokenizer = transformers.BertTokenizer.from_pretrained(
            "bert-base-uncased", do_lower_case=True
        )
        self.indexes = np.arange(len(self.sentence_pairs))
        self.on_epoch_end()

    def _len_(self):
        # Denotes the number of batches per epoch.
        return len(self.sentence_pairs) // self.batch_size

    def _getitem_(self, idx):
        # Retrieves the batch of index.
        indexes = self.indexes[idx * self.batch_size : (idx + 1) * self.batch_size]
        sentence_pairs = self.sentence_pairs[indexes]

        # With BERT tokenizer's batch_encode_plus batch of both the sentences are
        # encoded together and separated by [SEP] token.
        encoded = self.tokenizer.batch_encode_plus(
            sentence_pairs.tolist(),
            add_special_tokens=True,
            max_length=max_length,
            return_attention_mask=True,
            return_token_type_ids=True,
            pad_to_max_length=True,
            return_tensors="tf",
        )

        # Convert batch of encoded features to numpy array.
        input_ids = np.array(encoded["input_ids"], dtype="int32")
        attention_masks = np.array(encoded["attention_mask"], dtype="int32")
        token_type_ids = np.array(encoded["token_type_ids"], dtype="int32")

        # Set to true if data generator is used for training/validation.
        if self.include_targets:
            labels = np.array(self.labels[indexes], dtype="int32")
            return [input_ids, attention_masks, token_type_ids], labels
        else:
            return [input_ids, attention_masks, token_type_ids]

    def on_epoch_end(self):
        # Shuffle indexes after each epoch if shuffle is set to True.
        if self.shuffle:
            np.random.RandomState(42).shuffle(self.indexes)

strategy = tf.distribute.MirroredStrategy()

with strategy.scope():
    # Encoded token ids from BERT tokenizer.
    input_ids = tf.keras.layers.Input(
        shape=(max_length,), dtype=tf.int32, name="input_ids"
    )
    # Attention masks indicates to the model which tokens should be attended to.
    attention_masks = tf.keras.layers.Input(
        shape=(max_length,), dtype=tf.int32, name="attention_masks"
    )
    # Token type ids are binary masks identifying different sequences in the model.
    token_type_ids = tf.keras.layers.Input(
        shape=(max_length,), dtype=tf.int32, name="token_type_ids"
    )
    # Loading pretrained BERT model.
    bert_model = transformers.TFBertModel.from_pretrained("bert-base-uncased")

    # Freeze the BERT model to reuse the pretrained features without modifying them.
    bert_model.trainable = False

    bert_output = bert_model.bert(
        input_ids, attention_mask=attention_masks, token_type_ids=token_type_ids
    )
    sequence_output = bert_output.last_hidden_state
    pooled_output = bert_output.pooler_output

    # Add trainable layers on top of frozen layers to adapt the pretrained features on the new data.
    bi_lstm = tf.keras.layers.Bidirectional(
        tf.keras.layers.LSTM(64, return_sequences=True)
    )(sequence_output)

    # Applying hybrid pooling approach to bi_lstm sequence output.
    avg_pool = tf.keras.layers.GlobalAveragePooling1D()(bi_lstm)
    max_pool = tf.keras.layers.GlobalMaxPooling1D()(bi_lstm)
    concat = tf.keras.layers.concatenate([avg_pool, max_pool])
    dropout = tf.keras.layers.Dropout(0.3)(concat)
    output = tf.keras.layers.Dense(3, activation="softmax")(dropout)
    model = tf.keras.models.Model(
        inputs=[input_ids, attention_masks, token_type_ids], outputs=output
    )

    model.compile(
        optimizer=tf.keras.optimizers.Adam(),
        loss="categorical_crossentropy",
        metrics=["acc"],
    )


print(f"Strategy: {strategy}")
with h5py.File('./teacherModel/solutioncheck.h5', 'r') as f:
    def check_similarity(sentence1, sentence2):
        sentence_pairs = np.array([[str(sentence1), str(sentence2)]])
        test_data = BertSemanticDataGenerator(
            sentence_pairs, labels=None, batch_size=1, shuffle=False, include_targets=False,
        )

        proba = model.predict(test_data[0])[0]
        idx = np.argmax(proba)
        proba = f"{proba[idx]: .2f}%"
        pred = labels[idx]
        return pred, proba

class AutoAssign(APIView):
    
    def get(self,response,pk):
        myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
        # mydb = myclient["SIH-INITIAL"]
        # mycol = mydb["users"]
        mydb = myclient["Practice"]
        mycol = mydb["Collection01"]
        output=mycol.find_one({"_id":ObjectId(pk)})
        sentence1 = "Two women are observing something together."
        sentence2 = "Two women are standing with their eyes closed."
        ans=check_similarity(sentence1, sentence2)
        output=json.dumps(ans[0],default=str)   
        output1=json.dumps(ans[1],default=str)
        # marks=getmarks(output,output1);
        
        return Response({"Resp1":output,"Resp2":output1})
       
       # resp2_cleaned = output1.replace("\\", "").replace("%", "").strip()
        # temp = resp2_cleaned.replace("\"", "")
        # percent= float(temp)#number 
        # decision = output.replace("\"", "").strip()
        # if output=="entailment" and percent>=0.9:
        #    marks=100
        # elif output=="entailment" and percent>=0.8 and percent<0.9:
        #    marks= 80
        # elif output=="entailment" and percent<=0.2:
        #    marks= 20
        # elif output=="contradiction" and percent>=0.8:
        #    marks=50
        # elif output=="contradiction" and percent>=0.5:
        #    marks=10
        # elif output=="natural" and percent>=0.8:
        #    marks=100
        # elif output=="natural" and percent>=0.5:
        #    marks=80
        # elif output=="natural" and percent>=0.4:
        #    marks=40
        # else:
        #     marks=0 
    
    
class Teacher(APIView):
    def get(self,response,pk):
        myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
        # mydb = myclient["SIH-INITIAL"]
        # mycol = mydb["users"]
        mydb = myclient["Practice"]
        mycol = mydb["Collection01"]
        output=mycol.find_one({"_id":ObjectId(pk)})
        val = model.predict([[output.get("content"),output.get("interaction"),output.get("communication"),output.get("time_management")]])

        if val[0] == 0:
            val = "Bad"
        elif val[0] == 1:
            val = "Good"
        else:
            val = "Very Good"
        context={"message":val}
        return Response(context)


model2 = load_model('./teacherModel/student_engagement.h5')
class Assignment(APIView):

    def get(self,response,pk):
        myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
        mydb = myclient["SIH-INITIAL"]
        mycol = mydb["lectureuploads"]
        output=mycol.find_one({"_id":ObjectId(pk)})
        # val = model2.predict([[output.get("content"),output.get("interaction"),output.get("communication"),output.get("time_management")]])

        folder_dir = "./Api/images"
        url=output.get("lectureUrl")
        # url = "https://lecture-upload.s3.ap-south-1.amazonaws.com/Light%20-%20Reflection%20and%20Refraction.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATCBMLPYGNK5LUVCW%2F20231219%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231219T181212Z&X-Amz-Expires=900&X-Amz-Signature=1e727e1e362b261c48b1fc2657c9dba24b4710d04d349076fd2e4f4e5be27759&X-Amz-SignedHeaders=host&x-id=GetObject"
        video_url = url.split(".mp4")[0] + ".mp4"
        print(video_url)
        cap = cv2.VideoCapture(video_url)

        if not cap.isOpened():
            print("Error: Could not open video.")
            exit()

        # Create a directory to save the random screenshot
        output_directory = folder_dir
        os.makedirs(output_directory, exist_ok=True)

        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        pres_frame=0
        print(total_frames)
        val=0
        for i in range(0,int(total_frames/100)):
            #random_frame_index = random.randint(0, total_frames - 1)
            #print(random_frame_index)
            # print(pres_frame)
            pres_frame=pres_frame+int(total_frames/100)
            # Set the frame position to the random index
            if pres_frame<total_frames:
                cap.set(cv2.CAP_PROP_POS_FRAMES, pres_frame)
                
                # Read the frame at the random index
                ret,frame = cap.read()

                if ret:
                    # Save the frame as an image
                    screenshot_path = os.path.join(folder_dir, f"{val}.png")
                    val+=1
                    cv2.imwrite(screenshot_path, frame)

                    print(f"Random frame captured and saved to {screenshot_path}")
                else:
                    print("Error: Could not read frame.")
            else:
                break

        store=[]
        # Release the video capture object
        cap.release()
        for images in os.listdir(folder_dir):
            if (images.endswith(".png")):
                # image_path = 'Api/image.jpg'
                
                img = cv2.imread(os.path.join(folder_dir, images))
                # Check if the image is loaded successfully
                if img is None:
                    print(f"error': 'Unable to load the image")
                # test_img = img.astype(float)
                test_img = cv2.resize(img, dsize=(256, 256))
                test_inp = test_img.reshape((1, 256, 256, 3))
                pred = model2.predict(test_inp)
                
                if pred[0][0] == 1:
                    result = 'confused'
                elif pred[0][1] == 1:
                    result = 'Looking Away'
                elif pred[0][2] == 1:
                    result = 'bored'
                elif pred[0][3] == 1:
                    result = 'drowsy'
                elif pred[0][4] == 1:
                    result = 'engaged'
                elif pred[0][5] == 1:
                    result = 'Not Interested'
                store.append(result)
                
        for root, folder_dir, files in os.walk(folder_dir):
            for name in files:
                if name.endswith((".png")):
                    os.remove(os.path.join(root, name))
        result=json.dumps(store,default=str)
        return Response({'result': result})

  
     
class Student(APIView):
    
    def get(self,request,pk):
        myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
        mydb = myclient["SIH-INITIAL"]
        mycol = mydb["users"]
        id = pk
        output=mycol.find_one({"_id":ObjectId(pk)})
        val = model1.predict([[output.get("assignmentCredits"),output.get("assignmentsubmit"),output.get("credits"),output.get("studentClass")]])
        if val[0] == 0:
            val = "Bad"
        elif val[0] == 1:
            val = "Good"
        else:
            val = "Very Good"
        context={"message":val}
        return Response(context)
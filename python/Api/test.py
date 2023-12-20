import os
from os import listdir
import numpy as np
import pandas as pd
import tensorflow as tf
from django.http import JsonResponse
from keras.models import load_model
import cv2
import random 
# from rest_framework.views import APIView
# from rest_framework.response import Response




model2 = load_model('../teacherModel/student_engagement.h5')


def getEngagement(self,response):
    folder_dir = "../Api/images"
    url = "https://lecture-upload.s3.ap-south-1.amazonaws.com/Light%20-%20Reflection%20and%20Refraction.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATCBMLPYGNK5LUVCW%2F20231219%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231219T181212Z&X-Amz-Expires=900&X-Amz-Signature=1e727e1e362b261c48b1fc2657c9dba24b4710d04d349076fd2e4f4e5be27759&X-Amz-SignedHeaders=host&x-id=GetObject"
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

    val=0
    for i in range(0,5):
        random_frame_index = random.randint(0, total_frames - 1)
        # Set the frame position to the random index
        cap.set(cv2.CAP_PROP_POS_FRAMES, random_frame_index)

        # Read the frame at the random index
        ret, frame = cap.read()

        if ret:
            # Save the frame as an image
            screenshot_path = os.path.join(output_directory, f"{val}.png")
            val+=1
            cv2.imwrite(screenshot_path, frame)

            print(f"Random frame captured and saved to {screenshot_path}")
        else:
            print("Error: Could not read frame.")

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
    print(store)
      
getEngagement()
    

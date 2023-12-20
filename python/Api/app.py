import numpy as numpy
import pandas as pandas
import cv2
import tensorflow as tensorflow
import matplotlib.pyplot as plt
from keras.models import load_model

def fetch():
    model = load_model('../teacherModel/StudentPerformance/student_engagement.h5')
    print(model)
    imge=cv2.imread('young-handsome-man-beard-wearing-600nw-1680559948.jpg')
    test_img = imge.astype(float)
    plt.imshow(test_img)
    test_img=cv2.resize(test_img,(256,256))
    test_inp=test_img.reshape((1,256,256,3))
    pred=model.predict(test_inp)

    if (pred[0][0]==1):
        val='confused'
    elif pred[0][1]==1:
        val='Looking Away'      
    elif pred[0][2]==1:
        val='bored'
    elif pred[0][3]==1:
        val='drowsy'
    elif pred[0][4]==1:
        val='engaged'
    elif pred[0][5]==1:
        val='Not Interested'
    return val

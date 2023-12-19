from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from joblib import load
from bson.objectid import ObjectId
import json 


model = load("./teacherModel/TeacherEvalRf.joblib")
model1 = load("./teacherModel/StudEval.joblib")

class Teacher(APIView):
    def get(self,response,pk):
        myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
        mydb = myclient["SIH-INITIAL"]
        mycol = mydb["users"]
        # mydb = myclient["Practice"]
        # mycol = mydb["Collection01"]
        id = pk
        
        objInstance = ObjectId(id)
        output=mycol.find_one({"_id":ObjectId(pk)})
        # print(output.get("teacherClass"))
        val = model.predict([[output.get("content"),output.get("interaction"),output.get("communication"),output.get("time_management")]])
        # json_data = json.dumps(output,default=str)
        # return Response()
        # # val = model.predict([[sl, sw, pl, pw]])
        if val[0] == 0:
            val = "Bad"
        elif val[0] == 1:
            val = "Good"
        else:
            val = "Very Good"
        context={"message":val,"data":output}
        return Response(context)
    
    
class Student(APIView):
    def get(self,request,pk):
        myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
        mydb = myclient["SIH-INITIAL"]
        mycol = mydb["users"]
        # mydb = myclient["Practice"]
        # mycol = mydb["Collection01"]
        id = pk
        objInstance = ObjectId(id)
        output=mycol.find_one({"_id":ObjectId(pk)})
        # print(output.get("teacherClass"))
        val = model1.predict([[output.get("assignmentCredits"),output.get("assignmentsubmit"),output.get("credits"),output.get("studentClass")]])
        json_data = json.dumps(output,default=str)
        # return Response()
        # # val = model.predict([[sl, sw, pl, pw]])
        if val[0] == 0:
            val = "Bad"
        elif val[0] == 1:
            val = "Good"
        else:
            val = "Very Good"
        context={"message":val,"name":output.get('name'),"assignment":output.get("assignmentCredits"),"assignamesubmit":output.get("assignmentsubmit"),"credit":output.get("credits"),"studentclass":output.get("studentClass")}
        return Response(context)
        # return Response(json_data)
    
    
    
        
        
        
    

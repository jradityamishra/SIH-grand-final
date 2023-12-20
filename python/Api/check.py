from pymongo import MongoClient

def get():
    myclient = MongoClient("mongodb+srv://ashujimishra2003:XLXEm0iANCtBSVel@cluster0.85ukfuo.mongodb.net/SIH-INITIAL")
    mydb = myclient["SIH-INITIAL"]
    mycol = mydb["users"]
    # print(mycol.find())
    for x in mycol.find():
      print(x)
get()

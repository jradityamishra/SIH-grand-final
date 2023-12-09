import bcrypt from 'bcrypt'


export const hashPassword=async(password)=>{
    try{
        const saltRoundes=10;
        const hashedpassword=await bcrypt.hash(password,saltRoundes);
        return hashedpassword;
    }catch(error){
        console.log(error)
    }
}

export const comparePassword=async(password,hashedpassword)=>{
    return bcrypt.compare(password,hashedpassword)
}
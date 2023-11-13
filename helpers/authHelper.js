import bcrypt from 'bcrypt';

export const hashPassword = async(Password) =>{
    try{
        const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(Password,saltRounds)
       return hashedPassword;
    } catch(error){

    }
}

export const comparePassword =async (password, hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword); 

}
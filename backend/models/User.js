const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const UserSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImageUrl:{type:String,default:null},
},
{timestamps:true}
);
//Hash password before saving
// models/User.js

// 1. Add 'next' inside the parenthesis 👇
// models/User.js

// ✅ Modern Async Version (No 'next' parameter needed)
UserSchema.pre('save', async function() { 
    // If password is not modified, simply return (function ends)
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // No need to call next(), the function finishing signals success
    } catch (error) {
        throw new Error(error); // Throwing error stops the save
    }
});
//Compare passowrds
UserSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};
module.exports=mongoose.model("User",UserSchema);
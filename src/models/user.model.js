import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    }, 
    credits: {
        type: Number,
        default: 100,
        min: 0
    },
    plan: {
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free"
    }

    
},
{
    timestamps: true
}
)




export const User = mongoose.model("User", userSchema)

export default User



import mongoose from 'mongoose';
const EmployeeSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true , "Enter the name"]
        },
        department : {
            type : String,
            required : [true , "Enter Department"]
        },
        salary : {
            type : Number ,
            required : [true],
            default : 0 
        },
        dob : {
            type : Date ,
            required : [true,"Enter dob"]
        }
    },

{
    timestamps : true
})

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
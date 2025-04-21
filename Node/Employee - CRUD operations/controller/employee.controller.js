import Employee from "../models/employee.model.js"

// create employee
const createEmployee = async(req,res)=>{
    try{
        const employee = await Employee.create(req.body);
        res.status(200).json(employee);
    }
    catch(error){
        res.status(500).json({message : error.message})
        }
    }

//retrieve all employee details
const getAllEmployee = async(req,res)=>{
    try{
        const employee = await Employee.find();
        res.status(200).json(employee);
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}

// get a employee details using id
const getEmployee = async(req,res)=>{
    try{
        const { id } = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}

// update employee detail 
const updateEmployee = async(req,res)=>{
    try{
        const {id} = req.params ;
        const employee = await Employee.findByIdAndUpdate(id,req.body)
        if(!employee){
            return res.status(404).json({message : "Employee not found"})
        }
        const updateEmployee = await Employee.findById(id)
        res.status(200).json(updateEmployee)
    }
    catch(error){
        res.status(200).json({message : error.message})
    }
}

// delete a employee detail
const deleteEmployee = async(req,res)=>{
    try{
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message : "Employee not found"})
        }
        res.status(200).json({message : "Employee detail deleted successfully"})
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}

export{
    createEmployee,getAllEmployee,getEmployee ,updateEmployee ,deleteEmployee
}




const express=require('express');
const {Sequelize ,DataTypes}=require('sequelize');
const app=express();
const port=3001;

const sequelize=new Sequelize('BookStore','postgres','SwethaBellan',{
    dialect:'postgres',
    host:'localhost',
});

const Book=sequelize.define('Book',{
    title:DataTypes.STRING,
    author:DataTypes.STRING,
});

(async()=>{
    try{
        await sequelize.sync();
        console.log('Database synced');
    }catch(error){
        console.error('Error syncing databse',error);
    }
})();

app.use(express.json());

app.post('/books',async(req,res)=>{ 
    try{
    const newBook=await Book.create(req.body);
    res.status(201).json(newBook);
    }catch(error){
    res.status(500).json({error:error.message});
    }
})

app.get('/books',async(req,res)=>{

    try{
        const books=await Book.findAll();
        res.json(books);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.get('/book/:id',async(req,res)=>{
    try{
        const book=await Book.findByPk(req.params.id);
        if(book){
            res.json(book);
        }else{
            res.status(404).json({message:'Book not found'});
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

app.put('/books/:id',async(req,res)=>{
try{
    const [updatedRows]=await Book.update(req.body,{
        where:{id:req.params.id},
    });
    if(updatedRows>0){
        const updatedBook =await Book.findByPk(req.params.id);
        res.json(updatedBook);
    }else{
        res.status(404).json({message:'Book not found'});
    }
}catch{
    res.status(500).json({error:error.message});
}

});

app.delete('./books/:id',async(req,res)=>{
    try{
        const deletedRows=await Book.destroy({
            where:{id:req.params.id},
        });
        if(deletedRows>0){
            res.status(204).send();
        }else{
            res.status(404).json({message:'Book not found'});

        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

sequelize.sync()
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}); 
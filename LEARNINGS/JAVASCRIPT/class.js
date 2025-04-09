class User{
    constructor(name){
        this.name=name;
    }
    fullname(){
        console.log(this.name);
        
    }
}
let user=new User();
user.name="Swetha"
user.fullname();
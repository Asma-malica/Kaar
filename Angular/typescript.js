// function log(message: string): void {
//     console.log(message);
//   }
//   log('success');
// function main(){
//     for(var i=1;i<5;i++){
//         console.log(i)
//     }
//     console.log('Finally with var : ',i)
// }
// main();
// function main(){
//     for(let i=1;i<5;i++){
//         console.log(i)
//     }
//     console.log('Finally with let : ',i)
// }
// main();
// let count ;
// let a : number ;
// let b : string ;
// let c : boolean ;
// let d : any ;
// let e : number[] = [1,2,3] ;
// let f : any[] = [1,'a',true]
// enum Color{Red,Blue,Green}
// let backgroundColor = Color.Red;
// count = 'as'
// count = 1
// count = true
// let color;
// color = 'blue';
// let end = color.endsWith('e')
// let color;
// color = 'blue';
// let end = (<string>color).endsWith('e')
// let alternate_end = (color as string).endsWith('e')
//arrow function
// let log = function(message){
//     console.log(message)
// }
// let doLog = (message)=>{
//     console.log(message)
// }
//interface
// interface point{
//     x:number,y:number,z:number
// }
// let draw = (point)=>{
// }
// draw({x:1,y:1,z:2})
// class 
// class Point{
//     x:number
//     y:number
//     z:number
//     draw = ():any =>{
//         console.log('x:'+this.x,'y:'+this.y,'z:'+this.z)
//     }
//     drawTriangle : ()=>{
//     draw()
// }
// }
// let shape : Point = new Point();
// shape.x = 5 ;
// shape.y = 7 ;
// shape.z = 9 ;
// shape.draw()
// let shape1 : Point = new Point();
// shape1.x = 51 ;
// shape1.y = 71 ;
// shape1.z = 91 ;
// shape1.draw()
//constructor
var Point = /** @class */ (function () {
    function Point(x, y, z) {
        var _this = this;
        this.draw = function () {
            console.log('x:' + _this.x, 'y:' + _this.y, 'z:' + _this.z);
        };
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Point;
}());
var shape = new Point(1, 2, 3);
shape.draw();
var shape1 = new Point(3, 2, 1);
shape1.draw();

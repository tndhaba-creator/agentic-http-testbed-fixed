
export default function handler(req, res) {
  res.status(200).json([
    {id:101, name:"Widget Pro", price:175, warranty:"2 years", connector:"USB-C"},
    {id:202, name:"Gizmo X", price:169, warranty:"1 year", connector:"USB-C"},
    {id:303, name:"Thingamabob", price:150, warranty:"6 months", connector:"Micro-USB"}
  ]);
}

const { Router } = require('express');
const salesList = require('../../models/sales.models');
const router = Router();


// todo: get allitems on the  sales list
router.get('/', async (req, res) => {
  try{
    const salesitems = await salesList.find();

    if(!salesitems){
      throw new Error('No sales items found');
    }
    const sortedsalesitems = salesitems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    // res.sendStatus(200).json(sortedsalesitems);
    res.send(sortedsalesitems);
  } catch (err) {
      console.log('An error:', err +"occured")// res.status(500).json({ message: err.message });
  }
 });
  
  //todo: add sales item
router.post('/', async(req, res) => {
  const newsalesItem = new salesList(req.body);
  try{
    const salesitem = await newsalesItem.save();
    if(!salesitem){
      throw new Error('Something went wrong!');
    }
    res.json(salesitem);
  }catch(error){
    console.log('An error:', error +"occured");
  }
});

// todo: updating sales item
router.put('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const salesitem = await salesList.findByIdAndUpdate(id, req.body);
    if(!salesitem){
      throw new Error('Something went wrong!');
    }
    const updatedsalesitem = {...salesitem._doc, ...req.body};
    res.sendStatus(200).json(updatedsalesitem);
    
  }catch(error){
    console.log('An error:', error +"occured");
  }
});

// todo: delete sales item
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const removedItem = await salesList.findByIdAndDelete(id);
    if(!removedItem){
      throw new Error('Something went wrong!');
    }
    res.sendStatus(200).json(removedItem);
  }catch(error){
    console.log('An error:', error +"occured");
  }
});

module.exports = router;

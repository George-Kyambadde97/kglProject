const { Router } = require('express');
const creditList = require('../../models/credit.model');
const router = Router();


// todo: get allitems on the  procurement list
router.get('/', async (req, res) => {
  try{
    const creditems = await creditList.find();

    if(!creditems){
      throw new Error('No procurement items found');
    }
    const sortedcreditems = creditems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    // res.sendStatus(200).json(sortedcreditems);
    res.send(sortedcreditems);
  } catch (err) {
      console.log('An error:', err +"occured")// res.status(500).json({ message: err.message });
  }
 });
  
  //todo: add procurement item
router.post('/', async(req, res) => {
  const newProcurementItem = new creditList(req.body);
  try{
    const procurementitem = await newProcurementItem.save();
    if(!procurementitem){
      throw new Error('Something went wrong!');
    }
    res.json(procurementitem);
  }catch(error){
    console.log('An error:', error +"occured");
  }
});

// todo: updating procurement item
router.put('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const procurementitem = await creditList.findByIdAndUpdate(id, req.body);
    if(!procurementitem){
      throw new Error('Something went wrong!');
    }
    const updatedProcurementitem = {...procurementitem._doc, ...req.body};
    res.sendStatus(200).json(updatedProcurementitem);
    
  }catch(error){
    console.log('An error:', error +"occured");
  }
});

// todo: delete procurement item
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  try{
    const removedItem = await creditList.findByIdAndDelete(id);
    if(!removedItem){
      throw new Error('Something went wrong!');
    }
    res.sendStatus(200).json(removedItem);
  }catch(error){
    console.log('An error:', error +"occured");
  }
});

module.exports = router;

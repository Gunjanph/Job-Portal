const express = require('express');
const router = express.Router();

let Job = require('../../models/job');

router.get('/',(req,res) => {
	Job.find()
		.then(job => res.json(job))
		.catch(err => res.status(400).json('Error: '+ err));

});

router.get('/recruiter/:id',(req,res) => {
	Job.find()
		.then(job => res.json(job))
		.catch(err => res.status(400).json('Error: '+ err));

});

router.route('/post').post((req,res) =>{

	console.log(req);
	console.log(req.body);

	const Job = new Job({
        title: req.body.title,
        rname: String(req.body.name),
        remail: String(req.body.email),
		canapply: Number(req.body.canapply),
		position: Number(req.body.position),
		order: 0,
		status:'Not Dispatched',
		vendorname: req.body.vendorname,
		vrating: req.body.vrating,
		rating: 0,
		customers: 0,
		review: []
	})

	console.log(product);
	product.save()
		.then(() => res.json('Job added!!!'))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/').post((req,res) =>{
	console.log(req.body);
	Product.findById(req.body.value)
	.then(product => {
		product.order += Number(req.body.order);
		if(product.order>=product.quantity)
			product.status='Ready';
		else{
			product.status='Not Dispatched';
		}
		console.log(product);
		product.save()
			.then(() => res.json(product.status))
			.catch(err=> res.status(400).json('Error: '+err));
	})
	.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/updatevrating/').post((req,res) =>{
	console.log(req.body);
	Product.updateMany({vendorname:req.body.name},{ $set : {vrating: req.body.rating}},{upsert: true},
		(err,doc) => {
			if(err) console.log(err);
			console.log(doc);
		}
	);
})

router.route('/cancel/').post((req,res) => {

	console.log(req.body.value);

	Product.findById(req.body.value)
		.then(product => {
			product.status='Cancelled';

			product.save()
				.then(() => res.json('Product Cancelled!'))
				.catch(err => res.status(400).json('Error: '+err));
		})
		.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/dispatch/').post((req,res) => {

	Product.findById(req.body.value)
		.then(product => {
			product.status="Dispatched";

			product.save()
				.then(() => res.json('Product Dispatched!'))
				.catch(err => res.status(400).json('Error: '+err));
		})
		.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/delete').post((req,res) =>{

	console.log(req.body.value);
	Product.deleteOne({_id:req.body.value})
		.then(() =>res.json('Product deleted.'))
		.catch(err =>res.status(400).json('Error: '+ err));
});

router.route('/updaterr').post((req,res) =>{

	console.log(req.body);
	Product.findById(req.body.value)
		.then(product => {
			product.review.push(req.body.rev);
			product.rating+=(req.body.rat);
			x=Number(product.customers);
			x+=1;
			product.customers=x;

			product.save()
				.then(() => res.json('Product rated and reviewed'))
				.catch(err => res.status(400).json('Error: '+err));
		})
		.catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;
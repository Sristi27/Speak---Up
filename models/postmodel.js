const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema(
	{
	
		body:
		{
			title:
				{
					type:String,
					required:true
				}
			,body:
				{
					type:String,
					required:true
				}
			,
				sector:
				{
					type:String,
					required:true
				}
			,
			issues:
				{
					type:String,
					required:true
				}
			,advice:
				 {
					 type:String,
					 required:true
				 }
			
		},
		
		likes:
		[{
			type:ObjectId,
			ref:'User'	
		}],
		postedBy:
		{
			type:ObjectId,
			ref:"User"
		}
	}
)

module.exports = mongoose.model("Post", postSchema)
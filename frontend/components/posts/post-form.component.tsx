import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {PostInput} from "../../__generated__/graphql";

const FormDataDefault={
	text:'',
}
export const PostForm: React.FC<{ onSubmit:(input:PostInput)=>void }> = ({onSubmit}) => {
	const [formData,setFormData]=useState(FormDataDefault)

	const handleSend=()=>{
		onSubmit({ text:formData.text});
		formData.text='';
	}
	const handleText=(e:React.ChangeEvent<HTMLInputElement>)=>{
		setFormData({...formData,text:e.target.value})
	}
	return (
		<Card sx={{width:'100%'}}>
			<CardContent>
				<TextField
					id="outlined-textarea"
					label="Co je u tebe nového?"
					placeholder="Zadejte zprávu"
					multiline
					onChange={handleText}
					sx={{width:'100%'}}
					value={formData.text}
				/>
			</CardContent>
			<CardActions disableSpacing sx={{display: "flex", justifyContent: "flex-end",px:2}}>
				<Button disabled={formData.text.length<4} variant="contained" endIcon={<SendIcon />} onClick={handleSend}>Odeslat</Button>
			</CardActions>
		</Card>
	);
};
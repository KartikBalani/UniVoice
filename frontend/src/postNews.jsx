import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';

const postNews = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();
    
      const onSubmit = (data) => {
        
      };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
       <input type="text" placeholder="#Description" {...register('description',{required:true})}/>
       <input type="file" placeholder="#Thumbnail" {...register('thumbnail',{required:true})}/>
       <input type="text" placeholder="#article" {...register('article',{required:true})}/>
       <select {...register('categories', { required: true })}>
          <option value="club">Club</option>
          <option value="college">college</option>
          <option value="cultural">cultural</option>
          <option value="success">success</option>
          <option value="alumni">alumni</option>
        </select>
        <input type="submit" disabled={isSubmitting} value="Submit" />
      </form>
    </div>
  )
}

export default postNews

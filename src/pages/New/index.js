import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const[thumbnail, setThumbnail] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }


    return(
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''} >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>


            <label htmlFor="company">Company Name</label>
            <input type="text"
                id="company"
                placeholder="Your amazing company"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">Technologies <span>(comma separated)</span></label>
            <input type="text"
                id="techs"
                placeholder="ReactJS, VueJS, React Native..."
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">Spot daily cost <span>(leave empty for no cost)</span></label>
            <input type="text"
                id="price"
                placeholder="e.g.: 68"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Register</button>
        </form>
    )
}
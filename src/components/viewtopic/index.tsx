import React from 'react'
import Post from './post';

const ViewTopics = () => {
    let posts = [{
        id: 1,
        title: 'Au fil des mots / maux...',
        description: "C'est ici que vous devez poster votre premier message.",
        author: 'Armel Wanes'
    }, {
        id: 2,
        title: 'Vos Humeurs du Jour - H&B',
        description: "Commentez les histoires et discutez avec leur auteur",
        author: 'Armel Wanes'
    }, {
        id: 3,
        title: "Les interviews d' Xstory",
        description: "Parlez de tous vos fantasmes ....",
        author: 'Armel Wanes'
    }, {
        id: 4,
        title: "La meilleure chaine d'info",
        description: "Tout ce qui n'est pas lié au sexe ...",
        author: 'Armel Wanes'
    }, {
        id: 5,
        title: "Votre dernier film",
        description: "Tout ce qui n'est pas lié au sexe ...",
        author: 'Armel Wanes'
    }, {
        id: 6,
        title: "Question con !!!!!",
        description: "Tout ce qui n'est pas lié au sexe ...",
        author: 'Armel Wanes'
    }];
    return (
        <div className='flex flex-col gap-3'>
            {posts.map((post, index) => <Post index={index} key={post.id} {...post} />)}
        </div>
    )
}
export default ViewTopics;

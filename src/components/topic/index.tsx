import React from 'react'
import Topic from './Topic';

const Topics = () => {
    let posts = [{
        id: 1,
        title: 'Presentation des membres',
        description: "C'est ici que vous devez poster votre premier message.Présentation obligatoire après inscription.",
        author: 'Armel Wanes'
    },{
        id: 2,
        title: ' Histoires et Auteurs',
        description: "Commentez les histoires et discutez avec leur auteur. Discussion créée automatiquement à la publication de l'histoire",
        author: 'Armel Wanes'
    },{
        id: 3,
        title: 'Discussion sexy',
        description: "Parlez de tous vos fantasmes - dans la limite du raisonnable, échangez vos émotions, vos envies, ....",
        author: 'Armel Wanes'
    },{
        id: 4,
        title: 'Fun',
        description: "Tout ce qui n'est pas lié au sexe : délire, anecdote, divertissements, humeur, etc...",
        author: 'Armel Wanes'
    }];
    return (
        <div className='flex flex-col gap-5'>
            {posts.map((post, index) => <Topic index={index} key={post.id} {...post} />)}
        </div>
    )
}
export default Topics;

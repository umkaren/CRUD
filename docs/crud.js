const postForm = document.getElementById('postForm')
const createButton = document.getElementById('createPost')
const feedBox = document.getElementById('feedBox');

function createThis(){
    let content = document.getElementById('content').value; 
    let author = document.getElementById('author').value; 
    let tags = document.getElementById('tags').value; 

    const date = Date.now();
    const timeMade = new Date(date);
    
    post = {content, timeMade, author, tags}

    const feed = document.getElementById('feedBox') // MAke sure to update ID to match HTML
    const newPost = document.createElement("div")
    newPost.innerHTML = (`
    <h6> ${post.author}<h6> 
    <p> ${post.content} <p> 
    <p> ${post.timeMade} <p>
    <p> ${post.tags} <p>
    <button class="deleteButton">Delete Post</button>
    `);

    const deleteButton = newPost.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        newPost.remove();
    });

    feed.appendChild(newPost)
}

postForm.addEventListener('submit', event => {
    event.preventDefault();
    createThis()
})


// Senna Goes here

let posts = [
    { title: 'title1', body: 'body1', tag: 'funny' },
    { title: 'title2', body: 'body2', tag: 'art' },
    { title: 'title3', body: 'body3', tag: 'art' }]

let searchPosts = function (event){
    event.preventDefault();
    let postMatch = [];
    let listPosts = document.getElementById('listPosts');
    let keyword = document.getElementById('keyword').value;
    listPosts.innerHTML=""
    
for (let post of posts) {
    const match = post.tag.includes(keyword)

    if (match) {
        let index = post.tag.indexOf(keyword);
        console.log(index);
        console.log(post[index])
    

        let listItem = document.createElement('li');
        listItem.innerHTML = `<h2 id = "searchhistory">${post.title}</h2><p>${post.body}</p>`;
        listPosts.appendChild(listItem);
    }
}
console.log(postMatch);
}

let searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', searchPosts);



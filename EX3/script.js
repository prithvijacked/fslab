const blogForm = document.getElementById('blogForm');
const blogContent = document.getElementById('blogContent');
const blogsDiv = document.getElementById('blogs');

const loadBlogs = () => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    renderBlogs(blogs);
};

const renderBlogs = (blogs) => {
    blogsDiv.innerHTML = '';
    blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');
        blogDiv.innerHTML = `
            <p>${blog.content}</p>
            <button onclick="likeBlog('${blog.id}')">Like (${blog.likes})</button>
            <button onclick="dislikeBlog('${blog.id}')">Dislike (${blog.dislikes})</button>
            <div>
                <h4>Comments:</h4>
                <input type="text" id="commentInput-${blog.id}" placeholder="Add a comment..." />
                <button onclick="commentOnBlog('${blog.id}')">Comment</button>
                ${blog.comments.map(comment => `<p class="comment">${comment}</p>`).join('')}
            </div>
        `;
        blogsDiv.appendChild(blogDiv);
    });
};

const likeBlog = (id) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(b => b.id === id);
    if (blog) {
        blog.likes++;
        localStorage.setItem('blogs', JSON.stringify(blogs));
        loadBlogs();
    }
};

const dislikeBlog = (id) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(b => b.id === id);
    if (blog) {
        blog.dislikes++;
        localStorage.setItem('blogs', JSON.stringify(blogs));
        loadBlogs();
    }
};

const commentOnBlog = (id) => {
    const commentInput = document.getElementById(`commentInput-${id}`);
    const comment = commentInput.value;
    if (comment) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const blog = blogs.find(b => b.id === id);
        if (blog) {
            blog.comments.push(comment);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            commentInput.value = '';
            loadBlogs();
        }
    }
};

blogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const newBlog = {
        id: Date.now().toString(),
        content: blogContent.value,
        likes: 0,
        dislikes: 0,
        comments: []
    };
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    blogContent.value = '';
    loadBlogs();
});

// Initial load
loadBlogs();

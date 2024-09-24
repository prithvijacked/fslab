const blogForm = document.getElementById('blogForm');
const blogContent = document.getElementById('blogContent');
const blogsDiv = document.getElementById('blogs');

const loadBlogs = async () => {
    const response = await fetch('/api/blogs');
    const blogs = await response.json();
    renderBlogs(blogs);
};

const renderBlogs = (blogs) => {
    blogsDiv.innerHTML = '';
    blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');
        blogDiv.innerHTML = `
            <p>${blog.content}</p>
            <button onclick="likeBlog(${blog.id})">Like (${blog.likes})</button>
            <button onclick="dislikeBlog(${blog.id})">Dislike (${blog.dislikes})</button>
            <div>
                <h4>Comments:</h4>
                <input type="text" id="commentInput-${blog.id}" placeholder="Add a comment..." />
                <button onclick="commentOnBlog(${blog.id})">Comment</button>
                ${blog.comments.map(comment => `<p class="comment">${comment}</p>`).join('')}
            </div>
        `;
        blogsDiv.appendChild(blogDiv);
    });
};

const likeBlog = async (id) => {
    await fetch(`/api/blogs/${id}/like`, { method: 'POST' });
    loadBlogs();
};

const dislikeBlog = async (id) => {
    await fetch(`/api/blogs/${id}/dislike`, { method: 'POST' });
    loadBlogs();
};

const commentOnBlog = async (id) => {
    const commentInput = document.getElementById(`commentInput-${id}`);
    const comment = commentInput.value;
    if (comment) {
        await fetch(`/api/blogs/${id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment }),
        });
        commentInput.value = '';
        loadBlogs();
    }
};

blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = blogContent.value;
    await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });
    blogContent.value = '';
    loadBlogs();
});

// Initial load
loadBlogs();

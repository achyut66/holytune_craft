import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API calls
import DOMPurify from "dompurify";

const BlogComponent = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMoreMap, setShowMoreMap] = useState({}); // Track showMore state for each post

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get("/api/blogpost");
                setBlogPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError("There was an error fetching the blog posts.");
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Function to format the date and time
    const formatDateAndTime = (createdAt) => {
        const date = new Date(createdAt);
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString();

        return {
            date: dateString,
            time: timeString,
        };
    };

    // Toggle the "show more" content for a specific post
    const toggleContent = (postId) => {
        setShowMoreMap((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId], // Toggle showMore for the specific post
        }));
    };

    return (
        <div className="blog-container">
            {blogPosts.map((post) => {
                const { date, time } = formatDateAndTime(post.created_at);
                return (
                    <div key={post.id} className="blog-post">
                        <div className="user">
                            <img
                                src="assets/images/blogimage.jpg"
                                width="50"
                                height="50"
                                alt="Blog Post Image"
                            />
                            {post.user_name}
                        </div>

                        <div
                            className={`blog-content ${
                                showMoreMap[post.id] ? "expanded" : ""
                            }`}
                        >
                            <div
                                className="blog-content"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.posts),
                                }}
                            />
                        </div>

                        <div className="blog-image">
                            <img
                                src={`storage/${post.image}`}
                                width="200"
                                height="200"
                                style={{ borderRadius: "50px" }}
                                alt="Blog Image"
                            />
                        </div>
                        <p className="date">{date}</p>

                        {/* Display video only if showMore is true */}
                        {showMoreMap[post.id] && post.video && (
                            <iframe
                                width="560"
                                height="315"
                                src={`storage/${post.video}`} // Assuming the post has a video URL
                                title="Embedded Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}

                        <div
                            className="view-more"
                            onClick={() => toggleContent(post.id)}
                        >
                            <a
                                href="#"
                                style={{
                                    color: "#007BFF",
                                    textDecoration: "none",
                                }}
                            >
                                {showMoreMap[post.id]
                                    ? "View Less"
                                    : "View More"}
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BlogComponent;

import React from "react";

const Element_Distributor = ({ posts, loading}) => {


    return <tbody>
        {posts.map((post) => (
            <tr key={post.id} >
                <td>{post.username}</td>
                <td>{post.email}</td>
                <td>{post.role}</td>

            </tr>
        ))}
    </tbody>
};
export default Element_Distributor;




const Pagination = ({postsPerPage, totalPosts , Paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {//ceil  round to the smallest number
        pageNumbers.push(i);
    }
    return(
        <nav>

            <ul  className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} style={{marginleft: "left"}} className="page-item">
                        <a onClick={() => Paginate(number)}   className='page-link'>
                            {number}
                        </a>

                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination
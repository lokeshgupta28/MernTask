
import axios from 'axios';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

function Table({ data, itemsPerPage }) {
    console.log(data)
    const [currentPage, setCurrentPage] = useState(0);
    const[item,setItem]= useState();
   

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const paginatedData = data.slice(offset, offset + itemsPerPage)
    console.log(paginatedData)

const search =async(e)=>{
    let key= e.target.value;
    console.log(key)
    let res = await fetch(`http://localhost:5000/search/${key}`)
    res    = await res.json();
    setItem(res)
}
console.log("32",item)

function test(){
    console.log('test')
}
test();



    return (
        <>
            <div>
                <h1> Exchanges</h1>
             <input type='search' placeholder='search' onChange={search}></input>
                <table className="table table-bordered">
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr>
                                <td key={item.id}><img src={item.url} /></td>
                                <td>{item.name}</td>
                            </tr>
                        ))}
                    </tbody>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(data.length / itemsPerPage)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </table>
            </div>

        </>
    );
}

export default Table;

import { useState, useEffect } from "react";

export default function Pagination(props: paginationProps){


    const [linkModal,setLinkModal] = useState<linkModal[]>([]);

    function selectPage(link: linkModal){
        if (link.page === props.currentPage){
            return;
        }

        if (!link.enabled){
            return;
        }

        props.onChange(link.page);
    }

    function getClass(link: linkModal){
        if (link.active){
            return "active pointer";
        }

        if (!link.enabled){
            return "disabled";
        }

        return "pointer";
    }

    useEffect(() => {
        const previouspageEnabled = props.currentPage !==1;
        const previousPage = props.currentPage - 1;
        const links: linkModal[] = [];

        links.push({
            text: 'Previous',
            enabled: previouspageEnabled,
            page: previousPage,
            active: false

        })

        for (let i =1; i<= props.totalAmountOfPages; i++){
            if(i >= props.currentPage - props.radio && i<= props.currentPage + props.radio){
                links.push({
                    text: `${i}`,
                    enabled: true,
                    page: i,
                    active: props.currentPage === i
                });
            }
        }
        const NextPageEnabled = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0;
        const NextPage = props.currentPage + 1;

        links.push({
            text: 'Next',
            enabled: NextPageEnabled,
            page: NextPage,
            active: false
        })

        setLinkModal(links);
    }, [props.currentPage, props.totalAmountOfPages, props.radio] )


    return <nav>
        <ul className="pagination justify-content-center">
            {linkModal.map(link => <li key={link.text}
             onClick={() => selectPage(link)} 
             className={`page-item cursor ${getClass(link)}`}
            >
                <span className="page-link">{link.text}</span>
            </li>)}
        </ul>

    </nav>
}


interface linkModal{
    page: number;
    enabled: boolean;
    text: string;
    active: boolean;
}

interface paginationProps{
    currentPage: number;
    totalAmountOfPages: number;
    radio: number;
    onChange(page: number):void;
}

Pagination.defaultProps = {
    radio:3
}
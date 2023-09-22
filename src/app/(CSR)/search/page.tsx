import { Metadata } from "next";
import SearchPageContent from "./SearchPageContent";

export const metadata: Metadata = {
    title: 'Search',
}

const SearchPage = () => {
    return ( 
        <SearchPageContent />
     );
}
 
export default SearchPage;
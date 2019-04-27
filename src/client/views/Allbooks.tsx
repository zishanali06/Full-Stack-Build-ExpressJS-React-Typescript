import * as React from 'react';
import { json } from '../utils/api';

export interface AllbooksProps {
    
}
 
export interface AllbooksState {
    
}
 
class Allbooks extends React.Component<AllbooksProps, AllbooksState> {
    constructor(props: AllbooksProps) {
        super(props);
        this.state = {   };
    }

    async componentDidMount() {
        let books = await json('/api/books');
        console.log(books);
    }
    render() { 
        return ( <></> );
    }
}
 
export default Allbooks;
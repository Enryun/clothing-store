import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
 



const ShopPage = ({match}) => (

    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionsPage} />
    </div>

)


           

export default ShopPage;
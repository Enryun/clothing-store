import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';  
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selector'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionsPage);

class ShopPage extends React.Component {
    

    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    render () {
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;

        return (
            <div className='shop-page'>
                <Route exact 
                       path={`${match.path}`} 
                       render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
                    />
                <Route path={`${match.path}/:collectionId`} 
                       render={(props) => <CollectionsPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
                    />
            </div>)
        }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
           

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
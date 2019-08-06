import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionsPage);

class ShopPage extends React.Component {
    
    state = {
        loading: true
    }

    unsubcribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        
        this.unsubcribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});      
        })
    }

    render () {
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'>
                <Route exact 
                       path={`${match.path}`} 
                       render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                    />
                <Route path={`${match.path}/:collectionId`} 
                       render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />}
                    />
            </div>)
        }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(
        updateCollections(collectionsMap)
    )
})
           

export default connect(null, mapDispatchToProps)(ShopPage);
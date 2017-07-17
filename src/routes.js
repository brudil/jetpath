import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import ApplicationContainer from './containers/ApplicationContainer';
import BaseContainer from './containers/BaseContainer';
import StonewallContainer from './containers/StonewallContainer';
import ContentListPage from './containers/ContentListPage';
import MediaListPage from './containers/MediaListPage';
import EditorPage from './containers/EditorPage';
import EditorSectionContent from './containers/EditorSectionContent';
import EditorSectionMetadata from './containers/EditorSectionMetadata';
import EditorSectionWorkflow from './containers/EditorSectionWorkflow';
import InnerVerticalPage from './containers/InnerVerticalPage';
import VerticalSelectionPage from './containers/VerticalSelectionPage';
import OrganisationPage from './containers/OrganisationPage';
import LoginPage from './containers/LoginPage';
import NotFoundPage from './containers/NotFoundPage';

const routes = <Route component={ApplicationContainer} />;

export default routes;

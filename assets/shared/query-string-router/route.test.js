/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import QueryStringRouter, { Route, useQueryStringRouter } from './index';

const GoToSecondRoute = () => {
	const { goTo } = useQueryStringRouter();

	useEffect( () => {
		goTo( 'two' );
	}, [ goTo ] );

	return null;
};

describe( '<Route />', () => {
	it( 'Should render the default route', () => {
		const { queryByText } = render(
			<QueryStringRouter queryStringName="route" defaultRoute="one">
				<Route route="one">One</Route>
				<Route route="two">Two</Route>
			</QueryStringRouter>
		);

		expect( queryByText( 'One' ) ).toBeTruthy();
	} );

	it( 'Should render the current route', () => {
		const { queryByText } = render(
			<QueryStringRouter queryStringName="route" defaultRoute="one">
				<Route route="one">One</Route>
				<Route route="two">Two</Route>
				<GoToSecondRoute />
			</QueryStringRouter>
		);

		expect( queryByText( 'Two' ) ).toBeTruthy();
	} );
} );

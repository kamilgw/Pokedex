import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Details from '../screens/details/details';
import pageTabs from '../components/pageTabs';

const AppRoutes = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode={'none'} initialRouteName="PageTabs">
      <Stack.Screen name="PageTabs" component={pageTabs} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};
export default AppRoutes;

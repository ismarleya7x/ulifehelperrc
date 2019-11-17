import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './pages/Login';
import Sair from './pages/Login';
import Main from './pages/Main';
import BuscaSala from './pages/BuscaSala';
import BuscaLab from './pages/BuscaLab';
import Eventos from './pages/Eventos';

export default createAppContainer(
    createDrawerNavigator({
        Login,
        Main,
        BuscaSala,
        BuscaLab,
        Eventos,
        Sair
    })
) 
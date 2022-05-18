import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Ingredients from './Ingredients/Ingredients';
import CreateIngredient from './Ingredients/CreateIngredient';
import Recipe from './Recipes/Details';
import Recipes from './Recipes/List';
import Login from '../Components/Login';
import Register from '../Components/Register';
import log from '../utils/constants';
import About from './About';
import cookie from 'react-cookies';
import UseIngredientList from './Ingredients/UseIngredientList';
import Homepage from './Homepage';
import AddRecipe from './Recipes/AddRecipe';
import PrivacyPolicy from './PrivacyPolicy';
import Header from './Header';
import Footer from './Footer';
import messages_en from '../translations/en.json';
import messages_fr from '../translations/fr.json';
import {useState} from 'react';
import Moon from '../images/moon.png';
import Sun from '../images/sun.png';
import Search from './search';

function RouteConfig (props) {
  const messages = {
    en: messages_en,
    fr: messages_fr,
  };
  let isDark = false;
  if (
    cookie.load ('isDark') !== undefined &&
    cookie.load ('isDark') === 'true'
  ) {
    isDark = true;
  }

  const [icon, seticon] = useState (isDark ? Moon : Sun);
  const [bgcolor, setbgcolor] = useState (isDark ? 'green' : 'yellow');
  const [txttheme, settxttheme] = useState (
    isDark ? 'Dark Mode' : 'Bright Mode'
  );
  let [data, setData] = useState (messages.en);
  if (
    cookie.load ('language') !== undefined &&
    cookie.load ('language') == 'fr'
  ) {
    data = messages.fr;
  }

  const changeLanguage = () => {
    const locale = cookie.load ('language');
    console.log (locale);
    if (locale === 'en' || locale === undefined) {
      cookie.save ('language', 'fr');
      setData (messages_fr);
    }
    if (locale === 'fr') {
      cookie.save ('language', 'en');
      setData (messages_en);
    }
  };

  const settheme = () => {
    if (!isDark) {
      cookie.save ('isDark', 'true');
      isDark = true;
      seticon (Moon);
      setbgcolor ('green');
      settxttheme ('Dark Mode');
      props.setParentBg ('gray-700');
      props.setTxtColor ('white');
    } else {
      cookie.save ('isDark', 'false');
      isDark = false;
      seticon (Sun);
      setbgcolor ('yellow');
      settxttheme ('Bright Mode');
      props.setParentBg ('white');
      props.setTxtColor ('black');
    }
  };

  return (
    <div className="RouteConfig ">
      <Router>
        <Header
          user={props.user}
          themeCallBack={settheme.bind (this)}
          bgcolor={bgcolor}
          mode={txttheme}
          icon={icon}
          changeLanguage={changeLanguage.bind (this)}
          data={data}
        />
        <div>
          <Switch>
            {log (bgcolor)}
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>

            <Route exact path="/login">
              {cookie.load ('user') === undefined
                ? <Login
                    data={data}
                    refreshCallback={props.refreshCallback}
                    bgcolor={bgcolor}
                  />
                : <Homepage />}
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/privacyPolicy">
              <PrivacyPolicy data={data} />
            </Route>
            <Route exact path="/register">
              <Register bgcolor={bgcolor} data={data} />
            </Route>
            <Route exact path="/recipes">
              <Recipes data={data} />
            </Route>
            <Route
              exact
              path="/recipes/:id"
              render={p => <Recipes id={p.match.params.id} />}
            />
            <Route
              exact
              path="/view/recipes/:id"
              render={p => <Recipe id={p.match.params.id} />}
            />
            <Route exact path="/ingredients">
              <Ingredients bgcolor={bgcolor} data={data} success={"false"}/>
            </Route>
            <Route exact path="/ingredients/success">
              <Ingredients bgcolor={bgcolor} data={data} success={"true"}/>
            </Route>
            <Route exact path="/createIngrdient">
              <CreateIngredient />
            </Route>
            <Route
              exact
              path="/ingredients/:id"
              render={p => <UseIngredientList id={p.match.params.id} />}
            />
            <Route exact path="/addRecipe">
              <AddRecipe />
            </Route>
          </Switch>
        </div>
        <Footer bgcolor={bgcolor} data={data} mode={txttheme} icon={icon} />
      </Router>
    </div>
  );
}

export default RouteConfig;

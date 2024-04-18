import AllCategories from '../AllCategories'
import Food_Details from '../Food_Details'
import Notification from '../Notification'
import OrderSuccess from '../OrderSuccess'
import Payment_Info from '../Payment_Info'
import PersonalInfo from '../PersonalInfo'
import EditInformation from '../PersonalInfo/EditInformation'
import Search from '../Search'
import ResultByCategory from '../Search/ResultByCategory'
import ResultByName from '../Search/ResultByName'
import BottomTabs from '../Tabs/BottomTabs'
import Welcome from '../Welcome'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import OpenRestaurants from '../restaurant/OpenRestaurants'
import RestaurantView from '../restaurant/Restaurant_View'
import screenName from './screenName'

export const screens = [
    {
        name: screenName.welcome,
        component: Welcome,
    },
    {
        name: screenName.signIn,
        component: SignIn,
    },
    {
        name: screenName.signUp,
        component: SignUp,
    },
    {
        name: screenName.bottomTabs,
        component: BottomTabs,
    },
    {
        name: screenName.editInformation,
        component: EditInformation,
    },
    {
        name: screenName.personalInfo,
        component: PersonalInfo,
    },
    {
        name: screenName.notification,
        component: Notification,
    },
    {
        name: screenName.allCategories,
        component: AllCategories,
    },
    {
        name: screenName.openRestaurants,
        component: OpenRestaurants,
    },
    {
        name: screenName.restaurantView,
        component: RestaurantView,
    },
    {
        name: screenName.search,
        component: Search,
    },
    {
        name: screenName.resultByCategory,
        component: ResultByCategory,
    },
    {
        name: screenName.resultByName,
        component: ResultByName,
    },
    {
        name: screenName.foodDetails,
        component: Food_Details,
    },
    {
        name: screenName.orderSuccess,
        component: OrderSuccess,
    },
    {
        name: screenName.paymentInfo,
        component: Payment_Info,
    },
]

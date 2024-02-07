const {Router} = require ('express'); //Express
const stripe = require ('stripe')('sk_test_51OXSQHDoFxv8ulDuhZnuh3oT64UHRWai95QXJVabjoD5JokJxnYCBGeV4DeiE47NXUZvNQXWezL8v9xwIRUJ9uGM00CuN0CpEc') //Llave Privada


async function obtenerProductos() {
    try {
        const products = await stripe.products.list({ limit: 3 });

        console.log('Productos:', products.data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

obtenerProductos();

const arrayProductos = [
    {
        id: "price_1Oa1VHDoFxv8ulDu9riFbhjt",
        name: "Curso de Creador Contenido",
        price: 1000,
    },
    {
        id: "price_1OZklUDoFxv8ulDup3sHU2Hb",
        name: "Curso de Laravel",
        price: 200,
    },

]



const router = Router();

router.get('/', (req, res) => { //Define una ruta GET en la raíz ("/") de la aplicación.
    res.render('index');
})
router.post('/checkout', async (req, res) => {
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create ({
        amount: '63279',
        currency: 'usd',
        customer: customer.id,
        description: 'Curso 2'
    });
    console.log(charge.id);
    res.render('success');
});



module.exports = router;
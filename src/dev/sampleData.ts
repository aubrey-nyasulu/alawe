import { Branch, Client, Employee, Inventory, Invoice, Item, Payment, PaymentMethod, Product, ProductSold, PurchasedItem, PurchaseTransaction, Revenue, Salary, SalesTransaction, Supplier, UserRole, UserRoleOBJ } from "@/types";

const branches: Branch[] = [
    {
        branch_type: "Office",
        city: "Lilongwe",
        address: "Maula Mall, shop 1",
    },
    {
        branch_type: "Shop",
        city: "Lilongwe",
        address: "area 25, Nsungwi Market"
    },
    {
        branch_type: "Factory",
        city: "Blantyre",
        address: "Limbe, Noeumu new Avn"
    },
    {
        branch_type: "Storage",
        city: "Lilongwe",
        address: "Kanengo, Mpalapasa load"
    },
    {
        branch_type: "Shop",
        city: "mzuzu",
        address: "Mchenga Utuwa"
    },
]

const salaries: Salary[] = [
    {
        amount: 15000000,
        grade: 'grade 1'
    },
    {
        amount: 28000000,
        grade: 'grade 2'
    },
    {
        amount: 35000000,
        grade: 'grade 3'
    },
    {
        amount: 50000000,
        grade: 'grade 4'
    },
    {
        amount: 75000000,
        grade: 'grade 5'
    },
    {
        amount: 125000000,
        grade: 'grade 6'
    }
]

const clients: Client[] = [
    {
        name: "Shoprite",
        contact: "0123456789",
        email: "Shoprite@gmail.com",
        address: "Lilongwe, City Center, Malawi",
    },
    {
        name: "Shoprite",
        contact: "0123456789",
        email: "Shoprite@gmail.com",
        address: "Blantyre, Central Business District, Malawi",
    },
    {
        name: "Shoprite",
        contact: "0123456789",
        email: "Shoprite@gmail.com",
        address: "Mzuzu, Katoto, Malawi",
    },
    {
        name: "Chipiku Stores",
        contact: "9876543210",
        email: "chipiku@hotmail.com",
        address: "Blantyre, Central Business District, Malawi",
    },
    {
        name: "Chipiku Stores",
        contact: "9876543210",
        email: "chipiku@hotmail.com",
        address: "Mzuzu, Katoto, Malawi",
    },
    {
        name: "Chipiku Stores",
        contact: "9876543210",
        email: "chipiku@hotmail.com",
        address: "Lilongwe, City Center, Malawi",
    },
    {
        name: "Wize Shoppers",
        contact: "1234567890",
        email: "wizeshoppers@yahoo.com",
        address: "Mzuzu, Themba Triangle, Malawi",
    },
    {
        name: "Food Lovers",
        contact: "4567890123",
        email: "admarc_lil@gmail.com",
        address: "Lilongwe, Kanengo sec 4, Malawi",
    },
    {
        name: "Food Lovers",
        contact: "4567890123",
        email: "admarc_lil@gmail.com",
        address: "Lilongwe, City Center, Malawi",
    },
    {
        name: "Tumaini Supermarket Blantyre",
        contact: "3456789012",
        email: "tumaini_blantyre@hotmail.com",
        address: "Blantyre, Queens Road, Malawi",
    },
    {
        name: "Malingana",
        contact: "2345678901",
        email: "malingana_mzuzu@yahoo.com",
        address: "Mzuzu, Katoto, Malawi",
    },
    {
        name: "Maula Super Store",
        contact: "1234567890",
        email: "mpemba_lil@gmail.com",
        address: "Lilongwe, Maula, Malawi",
    },
    {
        name: "Nkoloko Super Store",
        contact: "9012345678",
        email: "nkoloko_blantyre@hotmail.com",
        address: "Blantyre, Nkoloko, Malawi",
    },
];

const employees: Employee[] = [
    {
        firstname: "Muhammed",
        lastname: "Yasid",
        email: "muhammed@gmail.com",
        branch_id: 'placeholder'
    },
    {
        firstname: "Dave",
        lastname: "Bandawe",
        email: "dave@gmail.com",
        branch_id: 'placeholder'
    },
    {
        firstname: "Maria",
        lastname: "magada",
        email: "maria@gmail.com",
        branch_id: "placeholder"
    },
    {
        firstname: "Ester",
        lastname: "chiyenda",
        email: "ester@gmail.com",
        branch_id: "placeholder"
    },
    {
        firstname: "Mayamiko",
        lastname: "Mchere",
        email: "mayamiko@gmail.com",
        branch_id: "placeholder"
    },
    {
        firstname: "Mphatso",
        lastname: "Tambala",
        email: "mphatso@gmail.com",
        branch_id: "placeholder"
    }
]

const UserRoles: UserRoleOBJ[] = [
    {
        role: "Company Manager"
    },
    {
        role: "Admin"
    },
    {
        role: "Supply Chain Manager"
    },
    {
        role: "Branch Manager"
    },
    {
        role: "Procurement Manager"
    },
]


const inventory: Inventory[] = [
    {
        product_id: "placeholder",
        quantity: 89,
        branch_id: "placeholder",
    },
    {
        product_id: "placeholder",
        quantity: 25,
        branch_id: "placeholder",
    },
    {
        product_id: "placeholder",
        branch_id: "placeholder",
        quantity: 322
    }
]

const invoices: Invoice[] = [
    {
        client_id: "placeholder",
        amount: 30000000,
        due_date: new Date('Wed sep 18 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid",
    },
    {
        client_id: "placeholder",
        amount: 73400045,
        due_date: new Date('Wed sep 18 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid",
    },
    {
        client_id: "placeholder",
        amount: 8200000,
        due_date: new Date('Wed dec 12 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 1500000,
        due_date: new Date('Wed dec 12 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 5800033,
        due_date: new Date('Wed aug 04 2023 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 83320030,
        due_date: new Date('Wed nov 30 2024 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 1100000,
        due_date: new Date('Wed may 12 2023 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid"
    },
    {
        client_id: "placeholder",
        amount: 4000000,
        due_date: new Date('Thur may 13 2023 17:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid"
    },
    {
        client_id: "placeholder",
        amount: 4800000,
        due_date: new Date('Wed may 02 2022 16:05:00 GMT+0200 (Central Africa Time)'),
        status: "pending"
    },
    {
        client_id: "placeholder",
        amount: 43800000,
        due_date: new Date('Wed feb 26 2022 22:05:00 GMT+0200 (Central Africa Time)'),
        status: "paid"
    }
]

const items: Item[] = [
    { name: "goat", type: "animal", price: 4000000 },
    { name: "cow", type: "animal", price: 30000000 },
    { name: "sheep", type: "animal", price: 5000000 },
    { name: "chicken", type: "animal", price: 800000 },
    { name: "fish", type: "animal", price: 2000000 },
    { name: "turkey", type: "animal", price: 2500000 },
    { name: "duck", type: "animal", price: 1000000 },
    { name: "quail", type: "animal", price: 400000 },
    { name: "rabbit", type: "animal", price: 1500000 },
    { name: "wheat", type: "grocery", price: 4000000 },
    { name: "corn", type: "grocery", price: 3000000 },
    { name: "rice", type: "grocery", price: 9000000 },
    { name: "sugar", type: "grocery", price: 4000000 },
    { name: "salt", type: "grocery", price: 40000 },
    { name: "pepper", type: "grocery", price: 20000 },
    { name: "flour", type: "grocery", price: 4000000 },
    { name: "butter", type: "grocery", price: 60000 },
    { name: "milk", type: "grocery", price: 300000 },
    { name: "eggs", type: "grocery", price: 600000 },
    { name: "cheese", type: "grocery", price: 4000000 },
    { name: "yogurt", type: "grocery", price: 150000 },
    { name: "bread", type: "grocery", price: 200000 },
    { name: "cooking oil", type: "grocery", price: 550000 },
]


const payments: Payment[] = [
    {
        invoice_id: "placeholder",
        amount: 1200000,
        client_id: "placeholder",
        payment_method_id: "placeholder"
    },
    {
        invoice_id: "placeholder",
        amount: 6300000,
        client_id: "placeholder",
        payment_method_id: "placeholder"
    },
    {
        invoice_id: "placeholder",
        amount: 2700000,
        client_id: "placeholder",
        payment_method_id: "placeholder"
    }
]

const paymentMethods: PaymentMethod[] = [
    {
        name: "Airtel Money",
    },
    {
        name: "Mpamba"
    },
    {
        name: "Bank"
    },
    {
        name: "Cash"
    }
]

const products: Product[] = [
    { name: "Sausage", type: "Meat Product", price: 550000 },
    { name: "Cooking Oil", type: "Grocery", price: 610000 },
    { name: "Steak", type: "Meat Product", price: 1200000 },
    { name: "Minced Beef", type: "Meat Product", price: 750000 },
    { name: "Chicken Breast", type: "Meat Product", price: 900000 },
    { name: "Pork Chops", type: "Meat Product", price: 850000 },
    { name: "Bacon", type: "Meat Product", price: 620000 },
    { name: "Whole Chicken", type: "Meat Product", price: 1100000 },
    { name: "Ground Turkey", type: "Meat Product", price: 680000 },
    { name: "Salami", type: "Meat Product", price: 600000 },
    { name: "Lamb Chops", type: "Meat Product", price: 1300000 },
    { name: "Beef Ribs", type: "Meat Product", price: 1000000 },
    { name: "Meatballs", type: "Meat Product", price: 700000 },
    { name: "Ham", type: "Meat Product", price: 580000 },
    { name: "Chicken Wings", type: "Meat Product", price: 450000 },
    { name: "Beef Steak", type: "Meat Product", price: 1150000 },
    { name: "Turkey Drumsticks", type: "Meat Product", price: 950000 },
    { name: "Fish Fillets", type: "Meat Product", price: 720000 },
    { name: "Liver", type: "Meat Product", price: 400000 },
    { name: "Kebabs", type: "Meat Product", price: 630000 },
    { name: "Butter", type: "Grocery", price: 550000 },
    { name: "Flour", type: "Grocery", price: 380000 },
    { name: "Milk", type: "Grocery", price: 430000 },
    { name: "Eggs", type: "Grocery", price: 320000 },
    { name: "Bread", type: "Grocery", price: 310000 },
    { name: "Rice", type: "Grocery", price: 520000 },
    { name: "Salt", type: "Grocery", price: 150000 },
    { name: "Sugar", type: "Grocery", price: 460000 },
    { name: "Tomato Sauce", type: "Grocery", price: 370000 },
    { name: "Spaghetti", type: "Grocery", price: 490000 },
    { name: "Cheese", type: "Grocery", price: 620000 },
    { name: "Cereal", type: "Grocery", price: 500000 },
    { name: "Tea", type: "Grocery", price: 240000 },
    { name: "Coffee", type: "Grocery", price: 580000 },
    { name: "Chips", type: "Grocery", price: 260000 },
    { name: "Yogurt", type: "Grocery", price: 360000 },
    { name: "Frozen Peas", type: "Grocery", price: 280000 },
    { name: "Orange Juice", type: "Grocery", price: 450000 },
    { name: "Beef Sausage", type: "Meat Product", price: 520000 },
    { name: "Smoked Chicken", type: "Meat Product", price: 850000 },
    { name: "Duck Breast", type: "Meat Product", price: 1250000 }
]


const productsSold: ProductSold[] = [
    {
        product_id: "placeholder",
        quantity: 78,
        sales_transaction_id: "placeholder",
        unit_price: 2500000
    },
    {
        product_id: "placeholder",
        quantity: 205,
        sales_transaction_id: "placeholder",
        unit_price: 4300000
    }
]

// const purchasedItems: PurchasedItem[] = [
//     {
//         item_id: "placeholder",
//         quantity: 89,
//         purchase_transaction_id: "placeholder",
//         unit_price: 140000
//     },
//     {
//         item_id: "placeholder",
//         quantity: 546,
//         purchase_transaction_id: "placeholder",
//         unit_price: 120000
//     }
// ]

const salesTransactions: SalesTransaction[] = [
    {
        branch_id: 'placeholder',
        purchase_total: 1200000
    },
    {
        branch_id: 'placeholder',
        purchase_total: 2300000
    }
]

const purchaseTransactions: PurchaseTransaction[] = [
    {
        purchase_total: 7,
        supplier_id: "placeholder",
    }
]

const suppliers: Supplier[] = [
    {
        name: 'Paulina Mitanda',
        contact: "12345674",
        address: "Chitukula, Ta Chitukula",
    },
    {
        name: 'Maulidi Bauleni',
        contact: "12345676",
        address: "Bimpi, Ta Mimpi",
    },
    {
        name: 'Peter Bannda',
        contact: "12345345",
        address: "Lunzu, Ta Makina",
    },
    {
        name: 'Chisomo Nkhata',
        contact: "12345676",
        address: "Chitipa, Ta Miti",
    },
    {
        name: 'Thoko Saulo',
        contact: "15445676",
        address: "Dedza, Ta zombole",
    },
    {
        name: 'Patrick Sekeya',
        contact: "4252467685",
        address: "Chileka, Ta Bauleni",
    },
    {
        name: 'Pempho Jimu',
        contact: "12345676",
        address: "Ntcheu, Ta Mataka",
    },
]

// const revenue: Revenue[] = [
//     { city: 'Lilongwe', month: 'Jan', revenue: 200000000 },
//     { city: 'Blantyre', month: 'Jan', revenue: 102800000 },
//     { city: 'Mzuzu', month: 'Jan', revenue: 156000000 },
//     { city: 'Lilongwe', month: 'Feb', revenue: 180000000 },
//     { city: 'Blantyre', month: 'Feb', revenue: 104000000 },
//     { city: 'Mzuzu', month: 'Feb', revenue: 190900000 },
//     { city: 'Lilongwe', month: 'Mar', revenue: 220000000 },
//     { city: 'Blantyre', month: 'Mar', revenue: 290700000 },
//     { city: 'Mzuzu', month: 'Mar', revenue: 170000000 },
//     { city: 'Lilongwe', month: 'Apr', revenue: 250000000 },
//     { city: 'Blantyre', month: 'Apr', revenue: 240000000 },
//     { city: 'Mzuzu', month: 'Apr', revenue: 190000000 },
//     { city: 'Lilongwe', month: 'May', revenue: 230000000 },
//     { city: 'Blantyre', month: 'May', revenue: 130000000 },
//     { city: 'Mzuzu', month: 'May', revenue: 330000000 },
//     { city: 'Lilongwe', month: 'Jun', revenue: 320000000 },
//     { city: 'Blantyre', month: 'Jun', revenue: 252000000 },
//     { city: 'Mzuzu', month: 'Jun', revenue: 420000000 },
//     { city: 'Lilongwe', month: 'Jul', revenue: 350000000 },
//     { city: 'Blantyre', month: 'Jul', revenue: 230000000 },
//     { city: 'Mzuzu', month: 'Jul', revenue: 310000000 },
//     { city: 'Lilongwe', month: 'Aug', revenue: 370000000 },
//     { city: 'Blantyre', month: 'Aug', revenue: 350000000 },
//     { city: 'Mzuzu', month: 'Aug', revenue: 240000000 },
//     { city: 'Lilongwe', month: 'Sep', revenue: 250000000 },
//     { city: 'Blantyre', month: 'Sep', revenue: 550000000 },
//     { city: 'Mzuzu', month: 'Sep', revenue: 450000000 },
//     { city: 'Lilongwe', month: 'Oct', revenue: 280000000 },
//     { city: 'Blantyre', month: 'Oct', revenue: 140000000 },
//     { city: 'Mzuzu', month: 'Oct', revenue: 280000000 },
//     { city: 'Lilongwe', month: 'Nov', revenue: 700000000 },
//     { city: 'Blantyre', month: 'Nov', revenue: 400000000 },
//     { city: 'Mzuzu', month: 'Nov', revenue: 300000000 },
//     { city: 'Lilongwe', month: 'Dec', revenue: 880000000 },
//     { city: 'Blantyre', month: 'Dec', revenue: 680000000 },
//     { city: 'Mzuzu', month: 'Dec', revenue: 380000000 },
// ]

const sampleData = {
    branches,
    salaries,
    clients,
    employees,
    inventory,
    invoices,
    items,
    payments,
    paymentMethods,
    products,
    productsSold,
    salesTransactions,
    // purchasedItems,
    purchaseTransactions,
    suppliers,
    // revenue,
    UserRoles
}
export default sampleData
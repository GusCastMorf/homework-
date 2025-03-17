menu = {
    "Burgers": [
        {"id": 1, "name": "Cheeseburger", "price": 5.99},
        {"id": 2, "name": "Veggie Burger", "price": 4.99},
        {"id": 3, "name": "Bacon Burger", "price": 6.99}
    ],
    "Drinks": [
        {"id": 4, "name": "Soda", "price": 1.99},
        {"id": 5, "name": "Water", "price": 0.99},
        {"id": 6, "name": "Milkshake", "price": 3.99}
    ]
}

def print_menu():
    print("\n--- Takeout Restaurant Menu ---")
    for category, items in menu.items():
        print(f"\n{category}:")
        for item in items:
            print(f"  {item['id']}. {item['name']} - ${item['price']:.2f}")
    print("\n")

from src.menu import menu, print_menu

def place_order():
    order = []
    total_price = 0.0

    while True:
        print_menu()
        
        user_input = input("Enter the item number you want to order (or 0 to finish): ")
        try:
            item_id = int(user_input)

            if item_id == 0:
                break

            item = None
            for category, items in menu.items():
                for i in items:
                    if i["id"] == item_id:
                        item = i
                        break 
                if item:  
                    break

            if not item:
                print("Invalid item number. Please try again.")
                continue

            quantity = input(f"How many {item['name']} would you like to order? ")
            quantity = int(quantity) if quantity.isdigit() else 1

            order.append({"name": item["name"], "price": item["price"], "quantity": quantity})
            total_price += item["price"] * quantity

            continue_ordering = input("Would you like to order more? (y/n): ").strip().lower()
            if continue_ordering == 'n':
                break

        except ValueError:
            print("Invalid input. Please enter a valid number.")

    return order, round(total_price, 2)


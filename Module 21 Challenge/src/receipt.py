def print_item_receipt(order, total_price):
    print("\n--- Takeout Restaurant Receipt ---")
    for item in order:
        print(f"{item['quantity']}x {item['name']} - ${item['price']:.2f} each")

    print(f"\nTotal Price: ${total_price:.2f}\n")
    print("Thank you for your order! Please come again.")
    
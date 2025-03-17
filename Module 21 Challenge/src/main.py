from menu import print_menu
from order import place_order
from receipt import print_item_receipt

def main():
    print("\nWelcome to the Takeout Restaurant!\n")
    
    order, total_price = place_order()

    if order:
        print_item_receipt(order, total_price)
    else:
        print("No items were ordered.")

if __name__ == "__main__":
    main()
    

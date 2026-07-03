#include <iostream>
#include <vector>
using namespace std;

struct MemoryBlock {
    int size;
};

vector<MemoryBlock> allocatedMemory;

void updateMemoryStatus() {
    int totalMemory = 0;
    cout << "\nAllocated Memory Blocks:\n";
    for (size_t i = 0; i < allocatedMemory.size(); ++i) {
        cout << "Block " << i + 1 << ": " << allocatedMemory[i].size << " KB\n";
        totalMemory += allocatedMemory[i].size;
    }
    cout << "Total Allocated Memory: " << totalMemory << " KB\n";
}

void allocateMemory() {
    int size;
    cout << "Enter memory size to allocate (KB): ";
    cin >> size;
    if (size > 0) {
        allocatedMemory.push_back({size});
        cout << "Allocated " << size << " KB successfully.\n";
    } else {
        cout << "Invalid size. Please enter a positive value.\n";
    }
    updateMemoryStatus();
}

void deallocateMemory() {
    if (allocatedMemory.empty()) {
        cout << "No memory blocks to deallocate.\n";
        return;
    }
    int index;
    cout << "Enter block number to deallocate: ";
    cin >> index;
    if (index > 0 && index <= allocatedMemory.size()) {
        allocatedMemory.erase(allocatedMemory.begin() + index - 1);
        cout << "Memory block deallocated.\n";
    } else {
        cout << "Invalid block number.\n";
    }
    updateMemoryStatus();
}

void resizeMemory() {
    if (allocatedMemory.empty()) {
        cout << "No memory blocks to resize.\n";
        return;
    }
    int index, newSize;
    cout << "Enter block number to resize: ";
    cin >> index;
    cout << "Enter new size (KB): ";
    cin >> newSize;
    if (index > 0 && index <= allocatedMemory.size() && newSize > 0) {
        allocatedMemory[index - 1].size = newSize;
        cout << "Memory block resized successfully.\n";
    } else {
        cout << "Invalid input.\n";
    }
    updateMemoryStatus();
}

int main() {
    int choice;
    while (true) {
        cout << "\nDynamic Memory Allocation Tracker\n";
        cout << "1. Allocate Memory\n2. Deallocate Memory\n3. Resize Memory\n4. Show Memory Status\n5. Exit\n";
        cout << "Choose an option: ";
        cin >> choice;
        switch (choice) {
            case 1: allocateMemory(); break;
            case 2: deallocateMemory(); break;
            case 3: resizeMemory(); break;
            case 4: updateMemoryStatus(); break;
            case 5: return 0;
            default: cout << "Invalid option. Try again.\n";
        }
    }
}

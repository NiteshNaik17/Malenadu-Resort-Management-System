const fs = require('fs');
const path = require('path');

const adminFile = path.join(__dirname, 'public', 'admin.html');
let content = fs.readFileSync(adminFile, 'utf8');

// 1. Add Tabs
const tabsHTML = `
            <li class="nav-item">
                <button class="nav-link" id="queries-tab" data-bs-toggle="tab" data-bs-target="#queries" type="button">Queries</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="food-menu-tab" data-bs-toggle="tab" data-bs-target="#food-menu" type="button">Manage Food</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="food-orders-tab" data-bs-toggle="tab" data-bs-target="#food-orders" type="button">Food Orders</button>
            </li>`;
content = content.replace(/<li class="nav-item">\s*<button class="nav-link" id="queries-tab" data-bs-toggle="tab" data-bs-target="#queries" type="button">Queries<\/button>\s*<\/li>/, tabsHTML);

// 2. Add Tab Panes
const tabPanesHTML = `
            <!-- Food Menu Tab -->
            <div class="tab-pane fade" id="food-menu">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5>Add New Food Item</h5>
                        <form id="add-food-form" class="row g-3">
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="foodName" placeholder="Food Name" required>
                            </div>
                            <div class="col-md-3">
                                <select class="form-select" id="foodCategory" required>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Desserts">Desserts</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <input type="number" class="form-control" id="foodPrice" placeholder="Price" required>
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="foodDesc" placeholder="Description" required>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-success">Add Food</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="food-list"></tbody>
                    </table>
                </div>
            </div>

            <!-- Food Orders Tab -->
            <div class="tab-pane fade" id="food-orders">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="food-orders-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`;
content = content.replace(/<\/div>\s*<\/div>\s*<script src="https:\/\/cdn.jsdelivr.net\/npm\/bootstrap@5.3.0\/dist\/js\/bootstrap.bundle.min.js"><\/script>/, tabPanesHTML + '\n    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>');

// 3. Add JS Logic
const jsLogic = `
            try {
                // Load Food Menu
                const foodRes = await fetch('/api/foods');
                const foods = await foodRes.json();
                document.getElementById('food-list').innerHTML = foods.map(f => \`
                    <tr>
                        <td>\${f.name}</td>
                        <td>\${f.category}</td>
                        <td>$\${f.price}</td>
                        <td>\${f.description}</td>
                        <td>
                            <button onclick="deleteFood('\${f._id}')" class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                \`).join('');
            } catch (e) { console.error('Food Load Error:', e); }

            try {
                // Load Food Orders
                const orderRes = await fetch('/api/food-orders');
                const orders = await orderRes.json();
                document.getElementById('food-orders-list').innerHTML = orders.map(o => \`
                    <tr>
                        <td>\${o._id}</td>
                        <td>\${o.userId ? o.userId.name : 'Unknown'}</td>
                        <td>\${o.items.map(i => i.name + ' (x' + i.quantity + ')').join(', ')}</td>
                        <td>$\${o.totalAmount}</td>
                        <td><span class="badge bg-\${o.status === 'Delivered' ? 'success' : 'warning'}">\${o.status}</span></td>
                        <td>
                            \${o.status !== 'Delivered' ? \`<button onclick="updateOrderStatus('\${o._id}', 'Delivered')" class="btn btn-sm btn-outline-success">Mark Delivered</button>\` : ''}
                        </td>
                    </tr>
                \`).join('');
            } catch (e) { console.error('Food Orders Load Error:', e); }
        }

        document.getElementById('add-food-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const food = {
                name: document.getElementById('foodName').value,
                category: document.getElementById('foodCategory').value,
                price: document.getElementById('foodPrice').value,
                description: document.getElementById('foodDesc').value
            };
            const res = await fetch('/api/foods', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(food)
            });
            if (res.ok) {
                alert('Food item added');
                e.target.reset();
                loadAdminData();
            }
        });

        async function deleteFood(id) {
            if (confirm('Delete this food item?')) {
                await fetch(\`/api/foods/\${id}\`, { method: 'DELETE' });
                loadAdminData();
            }
        }

        async function updateOrderStatus(id, status) {
            await fetch(\`/api/food-orders/\${id}/status\`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            loadAdminData();
        }
`;
content = content.replace(/}\s*document.getElementById\('add-room-form'\)/, jsLogic + '\n\n        document.getElementById(\'add-room-form\')');

fs.writeFileSync(adminFile, content);
console.log('Updated admin.html successfully.');

document.addEventListener('DOMContentLoaded', () => {
    fetchItems();

    document.getElementById('itemForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = document.getElementById('itemId').value;

        if (id) {
            // Edit item
            fetch('php/edit_item.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchItems();
                    closeModal();
                } else {
                    alert('Gagal mengedit barang');
                }
            });
        } else {
            // Add item
            fetch('php/add_item.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchItems();
                    closeModal();
                } else {
                    alert('Gagal menambah barang');
                }
            });
        }
    });
});

function fetchItems() {
    fetch('php/config.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('itemTableBody');
            tbody.innerHTML = '';
            data.forEach((item, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td><img src="${item.image}" alt="${item.name}"></td>
                        <td>${item.code}</td>
                        <td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>${item.unit}</td>
                        <td>${item.stock}</td>
                        <td>${item.price}</td>
                        <td>
                            <button class="btn-edit" onclick="openModal('edit', ${item.id})">Edit</button>
                            <button class="btn-delete" onclick="deleteItem(${item.id})">Hapus</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}

function openModal(mode, id = null) {
    const modal = document.getElementById('itemModal');
    const form = document.getElementById('itemForm');
    const modalTitle = document.getElementById('modalTitle');

    form.reset();
    document.getElementById('itemId').value = '';

    if (mode === 'edit' && id) {
        modalTitle.textContent = 'Edit Barang';
        fetch(`php/config.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('itemId').value = data.id;
                document.getElementById('code').value = data.code;
                document.getElementById('name').value = data.name;
                document.getElementById('category').value = data.category;
                document.getElementById('unit').value = data.unit;
                document.getElementById('stock').value = data.stock;
                document.getElementById('price').value = data.price;
            });
    } else {
        modalTitle.textContent = 'Tambah Barang';
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function deleteItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        fetch(`php/delete_item.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchItems();
            } else {
                alert('Gagal menghapus barang');
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
    fetchUserPhoto();
});

function fetchUserPhoto() {
    fetch('php/get_user.php') // File PHP baru untuk mengambil data user
        .then(response => response.json())
        .then(data => {
            document.getElementById('userPhoto').src = data.photo || 'https://via.placeholder.com/50'; // Fallback jika foto tidak ada
        })
        .catch(error => {
            console.error('Error fetching user photo:', error);
            document.getElementById('userPhoto').src = 'https://via.placeholder.com/50';
        });
}
@Entity(tableName = "firms")
data class FirmEntity(
    @PrimaryKey val gstin: String,
    val firmName: String,
    val address: String,
    val contactPerson: String,
    val phone: String,
    val email: String,
    val notes: String?
)

fun FirmEntity.toDomain() = Firm(
    gstin = gstin,
    firmName = firmName,
    address = address,
    contactPerson = contactPerson,
    phone = phone,
    email = email,
    notes = notes
)

fun Firm.toEntity() = FirmEntity(
    gstin = gstin,
    firmName = firmName,
    address = address,
    contactPerson = contactPerson,
    phone = phone,
    email = email,
    notes = notes
)

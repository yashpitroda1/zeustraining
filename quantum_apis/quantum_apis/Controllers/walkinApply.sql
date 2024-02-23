CREATE PROCEDURE InsertData
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insert query 1
        INSERT INTO Table1 (Column1, Column2) VALUES ('Value1', 'Value2');
        INSERT INTO Table3 (ID, Column1, Column2) VALUES (NULL, 'hfhh', 'sdfs');

        -- Insert query 2
        INSERT INTO Table2 (Column1, Column2) VALUES ('Value3', 'Value4');

        -- Insert query 3
        INSERT INTO Table3 (Column1, Column2) VALUES ('Value5', 'Value6');

        -- If all insert queries succeed, commit the transaction
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- If any error occurs, rollback the transaction
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Optional: Raise error or log the error
        THROW;
    END CATCH;
END;
